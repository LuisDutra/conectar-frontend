import { OptionsTypes } from '../components/Select';


export const monthOptions: OptionsTypes[] = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },

];
// preciso revisar

function createYearOptions() {

  const years: OptionsTypes[] = [{
    label: "2020",
    value: "2020",
  },];
  for (let index = 1; index < 100; index++) {
    const year = String(2019 - index);
    years.push({
      value: year,
      label: year,
    })
  }
  return years;
}
export const yearOptions: OptionsTypes[] = createYearOptions();
 