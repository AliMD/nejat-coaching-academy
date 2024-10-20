declare global {
  type SignUpFormData = {
    phoneNumber: string;
    password: string;
    invitationCode: string;
  };

  type UserDocument = {
    id: string;
    invitationCode: number;
    phoneNumber: number;
    cash: number;
    invitedUserCount: number;
  }

  type AuthData = {
    userId: string;
    userToken: string;
  }

  type PhoneNumberDocument = {
    phoneNumber: number;
  }

  type InvitationCodeDocument = {
    invitationCode: number;
  }

  type AuthDocument = {
    auth: string;
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
