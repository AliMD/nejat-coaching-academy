declare global {
  type UserFormData = {
    cellPhoneNumber: string;
  };

  type User = {
    cellPhoneNumber: string;
    cash: number;
    courseIds: string[];
    missionDoneIds: string[];
    missionIds: string[];
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
