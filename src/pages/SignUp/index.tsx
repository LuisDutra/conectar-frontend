import React, { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { BodySignUp } from './styles';
import logo from '../../assets/image/logo_fundoClaro.svg';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import ToggleSwitch from '../../components/ToggleSwitch';
import { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { monthOptions, yearOptions } from '../../utils/dates';
import axios, { AxiosError } from "axios";
import {  selectChange } from '../../utils/selectChange';

interface renderFacebook {
  onClick: () => void;
  disabled?: boolean;
}


function SignUp() {

  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    telefone: "",
    nome: "",
    username: "",
    password: "",
    celular: "",
    year: "",
    month: "",
    day: "",
    idealizador: false,
    colaborador: false,
    aliado: false,
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    console.log(`name = ${name}\n value = ${value} `);
    setFormData({ ...formData, [name]: value })
  };

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    /**
     * Helper function to handle selectChanges when using hooks
     * @param {ChangeEvent<HTMLSelectElement>} event
     * @param {Function} setFormData
     * @param {Object} formData
     */
    const { name, value } = event.target;
    setFormData({...formData, [name]: value });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const {email,telefone,nome,username ,year,password ,month, day, aliado,celular,colaborador,idealizador} = formData;

    const data_nascimento = `${year}-${month}-${day}`;

    const data = new FormData();
    

    data.append('data_nascimento', data_nascimento);
    data.append('email', email);
    data.append('telefone', telefone);
    data.append('nome', nome);
    data.append('username', username);
    data.append('password', password);
    data.append('celular', celular);

    const res = await axios
      .post("/api/signup", data, {
        withCredentials: true,
      })
      .catch((err: AxiosError) => {
        return err?.response?.data.detail;
      });
    console.log(res);
    alert(res);
  }

  const [showNextStep, setShowNextStep] = useState<boolean>(false);

  const responseFacebook = (resposta: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    console.log(resposta);
  }
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response);
  }

  return (
    <BodySignUp showSecondStep={showNextStep}>
      <form onSubmit={handleSubmit} className="area-central container">
        {/* /**
             * COMMENT
             * Please make separate components for each form
             */}
        <Link to="/"><img src={logo} alt="logo" /></Link>
        <div className="primeira-etapa">

          <img src="" alt="#" className="area-img" />


          <div className="area-form">


            <h1>Criar sua conta</h1>
            <Input name="nome" label="Nome Completo" onChange={handleInputChange}/>
            <Input type="email" name="email" label="E-mail" onChange={handleInputChange}/>
            <section>
              <Input name="username" label="Nome de usuário" onChange={handleInputChange}/>
              <Input type="password" name="password" label="Senha" onChange={handleInputChange}/>
            </section>
            <p>Ao prosseguir, você concorda com os <Link to="#">Termos de Uso</Link> e <Link to="#">Política de Privacidade.</Link></p>

            <section>
              <Link to="login">Já tem uma conta?</Link>
              <Button 
              type="submit"
              onClick={() => setShowNextStep(true)}
              theme="primary-yellow"
              >Continuar
              </Button>
            </section>
            <section>

              <FacebookLogin
                appId="1088597931155576"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="facebook-button"
                textButton="Cadastre-se com Facebook"
                icon={<FaFacebookF />}

              />
              <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                render={renderProps => (
                  <button
                    className="google-button"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle />
                  Inscreva-se com Google
                  </button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />


            </section>
          </div>
        </div>
        </form>
        <div className="segunda-etapa">
          <legend>
            <h1>Bem vindo(a) ao Conectar</h1>
          </legend>
          <section>
            <Input type="tel" name="telefone" label="Celular" onChange={handleInputChange}></Input>
            <Select
              label="Data de Nascimento"
              name="year"
              defaultOption="Ano"
              options={yearOptions}
              onChange={handleSelectChange}
            />
            <Select
              name="month"
              defaultOption="Mês"
              options={monthOptions}
              onChange={handleSelectChange}
            />
            <Input type="number" name="day" placeholder="Dia" onChange={handleInputChange}></Input>

          </section>
          <section>
            <legend>Tipo de Perfil</legend>
            <span>Selecione um ou mais tipos</span>
          </section>
          <section className="tipo-perfil">
            <fieldset>

              <legend>Idealizador</legend>
              <aside>
                <p>xxxxxxxxxxxxxxxx xxx xxxx</p>
                <ToggleSwitch name="idealizador" id="idealizador" onChange={handleInputChange}/>

              </aside>
            </fieldset>
            <fieldset>

              <legend>Colaborador</legend>
              <aside>
                <p>xxxxxxxxxxxxxxxx xxx xxxx</p>
                <ToggleSwitch name="colaborador" id="colaborador" onChange={handleInputChange}/>


              </aside>
            </fieldset>
            <fieldset>
              <legend>Aliado</legend>
              <aside>
                <p>xxxxxxxxxxxxxxxx xxx xxxx</p>
                <ToggleSwitch name="aliado" id="aliado" onChange={handleInputChange}/>

              </aside>
            </fieldset>
          </section>
          <section>
            <button className="voltar" type="button" onClick={() => setShowNextStep(false)}>Voltar</button>
            <Button 
            theme="primary-yellow"
            >Continuar</Button>
          </section>
        </div>
    </BodySignUp>
  )
}
export default SignUp;