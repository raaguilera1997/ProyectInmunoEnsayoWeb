let userStatus = false
let userData = {
  email: "",
  phoneNumber: "",
  userName: "",
  lockoutEnabled: false,
  twoFactorEnabled: false,
  permissions: [],
  roleName:"",
  needWizard: false,
  emailConfirmed: false,
  phoneNumberConfirmed: false,
  canCreateUsers: false,
  wasInitializated: false
}

export function getUserData () {
  return userData
}

export function getUserStatus () {
  return userStatus
}

export function setUserData (params: {
  userData: {
    email: string;
    phoneNumber: string;
    userName: string;
    lockoutEnabled: boolean;
    twoFactorEnabled: boolean;
    emailConfirmed: boolean;
    phoneNumberConfirmed: boolean;
    canCreateUsers: boolean;
    wasInitializated: boolean;
  },
  boProfile:{
    name: string;
    permissions: [];
  },
  needWizard: boolean;
}) {
  userStatus = true
  userData = {
    email: params.userData.email,
    phoneNumber: params.userData.phoneNumber,
    userName: params.userData.userName,
    lockoutEnabled: params.userData.lockoutEnabled,
    twoFactorEnabled: params.userData.twoFactorEnabled,
    emailConfirmed: params.userData.emailConfirmed,
    wasInitializated: params.userData.wasInitializated,
    phoneNumberConfirmed: params.userData.phoneNumberConfirmed,
    canCreateUsers: params.userData.canCreateUsers,
    permissions: params.boProfile.permissions,
    roleName: params.boProfile.name,
    needWizard: params.needWizard
  }
}

export function cleanUserData () {
  userStatus = false
  userData = {
    email: "",
    phoneNumber: "",
    userName: "",
    lockoutEnabled: false,
    twoFactorEnabled: false,
    permissions: [],
    roleName: "",
    needWizard:false,
    emailConfirmed:false,
    canCreateUsers:false,
    phoneNumberConfirmed:false,
    wasInitializated:false
  }
}
