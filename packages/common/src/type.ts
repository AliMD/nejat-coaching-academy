declare global {
  type UserFormData = {
    cellPhoneNumber: string;
    referralCode?: string;
  };

  type User = {
    id: string;
    referralCode: string;
    cellPhoneNumber: string;
    cash: number;
    invitedUserIds: string[];
    preRegisterUserIds: string[];
    registeredUserIds: string[];
  }

  type UserDataAfterSave = {
    id: string;
    cellPhoneNumber: string;
    referralCode: string;
    cash: number;
    invitedCount: number;
    preRegisterCount: number;
    registeredCount: number;
  }

  type Mission = {
    id: string;
    title: string;
    done?: true;
    steps: {
      id: string;
      title: string;
      done?: true;
    }[]
  }

  type CityItem = {
    id: string;
    label: string;
    slug: string;
  }

  type ProvinceItem = CityItem & { cities: CityItem[] };

  type SelectOptionItem = { value: string; label: string };
}

export {};
