export interface User {
  firstName: string;
  lastName: string;
  cellPhoneNumber: string;
  nationalCode: string;
  birthDate: {
    day: string;
    month: string;
    year: string;
  }
}

export type UserFormData = User & { deviceSerial: string; provinceId: string; cityId: string; };

export interface AgentFormData {
  cellPhoneNumber: string;
  nationalCode: string;
  invoiceSerial: string;
  deviceSerial: string;
  fileId: number | string;
}

export type AdminAgentFormData = Omit<User, 'birthDate'> & {
  id: string;
  provinceId: string;
  cityId: string;
  shebaCode: string;
};


export interface CityItem {
  id: string;
  label: string;
  slug: string;
}

export type ProvinceItem = CityItem & { cities: CityItem[] };

export type SelectOptionItem = { value: string; label: string };
