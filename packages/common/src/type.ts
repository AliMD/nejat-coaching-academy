declare global {
  interface User {
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

  type UserFormData = User & { deviceSerial: string; provinceId: string; cityId: string; };

  interface AgentFormData {
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


  interface CityItem {
    id: string;
    label: string;
    slug: string;
  }

  type ProvinceItem = CityItem & { cities: CityItem[] };

  type SelectOptionItem = { value: string; label: string };
}

export {};
