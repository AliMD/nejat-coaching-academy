declare global {
  type User = {
    firstName: string;
    lastName: string;
    cellPhoneNumber: string;
    nationalCode: string;
    birthDate: string;
  }

  type UserFormData = {
    firstName: string;
    lastName: string;
    cellPhoneNumber: string;
    birthDate: string;
    deviceSerial: string;
    provinceId: string;
    cityId: string;
  };

  type AgentFormData = {
    cellPhoneNumber: string;
    nationalCode: string;
    invoiceSerial: string;
    deviceSerial: string;
    fileId: number | string;
  }

  type AdminAgentFormData = Omit<User, 'birthDate'> & {
    id: string;
    provinceId: string;
    cityId: string;
    shebaCode: string;
  };


  type CityItem = {
    id: string;
    label: string;
    slug: string;
  }

  type ProvinceItem = CityItem & { cities: CityItem[] };

  type SelectOptionItem = { value: string; label: string };
}

export {};
