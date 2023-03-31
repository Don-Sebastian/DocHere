interface ProfileType {
  speciality: String;
  educationQuality: String;
  medicalRegNumber: Number;
  medRegCouncil: String;
  medRegYear: Number;
  profileImageDoctor: String;
}
export interface LoadingTypeDoctor {
    _id?: String;
  name: String;
  email: String;
  verified_by_admin: boolean;
  loggedIn: boolean;
  avatar: String;
  profile: ProfileType[];
}

interface notificationType{
    doctorId: String;
    doctorName: String;
    onclick: String;
}

export interface AdminDetailsType {
  email: string;
  unseenNotifications: notificationType[];
}
