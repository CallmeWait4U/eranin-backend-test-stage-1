export type MailerDTO = {
  from?: {
    name: string;
    address: string;
  };
  recipients: {
    name: string;
    address: string;
  }[];
  subject: string;
  code: string;
};
