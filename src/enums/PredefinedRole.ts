export enum PredefinedRole {
  /**
   * Usage of this enum type points to application error
   */
  UNKNOWN = 0,

  ADMIN,

  POWER_USER,

  USER,

  GUEST,
}

export const parseRole = (role?: string | null): PredefinedRole => {
  if (!role) {
    return PredefinedRole.UNKNOWN;
  }

  switch (role.toLowerCase()) {
    case PredefinedRole.ADMIN.toString().toLowerCase():
      return PredefinedRole.ADMIN;
    case PredefinedRole.POWER_USER.toString().toLowerCase():
      return PredefinedRole.POWER_USER;
    case PredefinedRole.USER.toString().toLowerCase():
      return PredefinedRole.USER;
    case PredefinedRole.GUEST.toString().toLowerCase():
      return PredefinedRole.GUEST;
    default:
      throw new Error('Unknown role:' + role);
  }
};
