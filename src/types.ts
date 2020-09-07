export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** ------> QUERIES HERE */
export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  getAppartment?: Maybe<Appartment>;
  getVoucher?: Maybe<Voucher>;
  getBooking?: Maybe<Booking>;
  getOrder?: Maybe<Order>;
  getBookings?: Maybe<Array<Maybe<Booking>>>;
  getOrders?: Maybe<Array<Maybe<Order>>>;
  listAppartments?: Maybe<Array<Maybe<Appartment>>>;
  listVouchers?: Maybe<Array<Maybe<Voucher>>>;
  listBookings?: Maybe<Array<Maybe<Booking>>>;
  listOrders?: Maybe<Array<Maybe<Order>>>;
  listItems?: Maybe<Array<Maybe<Item>>>;
  getAdminReport?: Maybe<Array<Maybe<ReportItem>>>;
};


/** ------> QUERIES HERE */
export type QueryGetAppartmentArgs = {
  id: Scalars['ID'];
};


/** ------> QUERIES HERE */
export type QueryGetVoucherArgs = {
  id: Scalars['ID'];
};


/** ------> QUERIES HERE */
export type QueryGetBookingArgs = {
  id: Scalars['ID'];
};


/** ------> QUERIES HERE */
export type QueryGetOrderArgs = {
  id: Scalars['ID'];
};


/** ------> QUERIES HERE */
export type QueryGetBookingsArgs = {
  id?: Maybe<Scalars['ID']>;
};


/** ------> QUERIES HERE */
export type QueryGetOrdersArgs = {
  id?: Maybe<Scalars['ID']>;
};


/** ------> QUERIES HERE */
export type QueryListBookingsArgs = {
  id?: Maybe<Scalars['ID']>;
};


/** ------> QUERIES HERE */
export type QueryListOrdersArgs = {
  id?: Maybe<Scalars['ID']>;
};


/** ------> QUERIES HERE */
export type QueryListItemsArgs = {
  sort?: Maybe<Scalars['String']>;
};


/** ------> QUERIES HERE */
export type QueryGetAdminReportArgs = {
  sort?: Maybe<Scalars['String']>;
};

/** ------> MUTATIONS HERE */
export type Mutation = {
  __typename?: 'Mutation';
  makeBooking?: Maybe<Booking>;
  makeOrder?: Maybe<Order>;
  addUser?: Maybe<User>;
  addAppartment?: Maybe<Appartment>;
  addVoucher?: Maybe<Voucher>;
  editAppartment?: Maybe<Appartment>;
  editVoucher?: Maybe<Voucher>;
  signIn?: Maybe<UserAuth>;
  signUp?: Maybe<User>;
};


/** ------> MUTATIONS HERE */
export type MutationMakeBookingArgs = {
  input: MakeBookingInput;
};


/** ------> MUTATIONS HERE */
export type MutationMakeOrderArgs = {
  input: MakeOrderInput;
};


/** ------> MUTATIONS HERE */
export type MutationAddUserArgs = {
  input: AddUserInput;
};


/** ------> MUTATIONS HERE */
export type MutationAddAppartmentArgs = {
  input: AddAppartmentInput;
};


/** ------> MUTATIONS HERE */
export type MutationAddVoucherArgs = {
  input: AddVoucherInput;
};


/** ------> MUTATIONS HERE */
export type MutationEditAppartmentArgs = {
  input?: Maybe<EditAppartmentInput>;
};


/** ------> MUTATIONS HERE */
export type MutationEditVoucherArgs = {
  input?: Maybe<EditVoucherInput>;
};


/** ------> MUTATIONS HERE */
export type MutationSignInArgs = {
  input?: Maybe<UserSignInInput>;
};


/** ------> MUTATIONS HERE */
export type MutationSignUpArgs = {
  input?: Maybe<UserSignUpInput>;
};

/** ------> BOOKING / ORDER INPUT */
export type MakeBookingInput = {
  appartmentID: Scalars['ID'];
  timeSlot: Scalars['ID'];
};

export type MakeOrderInput = {
  voucherID: Scalars['ID'];
  amount: Scalars['ID'];
};

/** ------> ADD USER / APP / VOUCHER INPUT */
export type AddUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

export type AddAppartmentInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  rooms: Scalars['Int'];
  timeSlots?: Maybe<Array<Maybe<TimeSlotInput>>>;
};

export type AddVoucherInput = {
  name: Scalars['String'];
  price: Scalars['Int'];
  variant: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
};

/** ------> EDIT USER / APP / VOUCHER INPUT */
export type EditAppartmentInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  rooms?: Maybe<Scalars['Int']>;
  timeSlots?: Maybe<Array<Maybe<TimeSlotInput>>>;
};

export type TimeSlotInput = {
  id?: Maybe<Scalars['ID']>;
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
};

export type EditVoucherInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Int'];
  variant: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
};

/** ------> SIGN UP/IN */
export type UserSignUpInput = {
  type: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserSignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

/** ------> TYPES DESCRIPTION */
export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  type: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  bookings?: Maybe<Array<Maybe<Booking>>>;
  orders?: Maybe<Array<Maybe<Order>>>;
  appartments?: Maybe<Array<Maybe<Appartment>>>;
  vouchers?: Maybe<Array<Maybe<Voucher>>>;
};

export type Appartment = {
  __typename?: 'Appartment';
  id: Scalars['ID'];
  owner: User;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  rooms: Scalars['Int'];
  timeSlots?: Maybe<Array<Maybe<TimeSlot>>>;
};

export type Voucher = {
  __typename?: 'Voucher';
  id: Scalars['ID'];
  owner: User;
  name: Scalars['String'];
  price: Scalars['Int'];
  variant: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
};

export type Booking = {
  __typename?: 'Booking';
  id: Scalars['ID'];
  appartment?: Maybe<Appartment>;
  timeSlot?: Maybe<TimeSlot>;
  buyer?: Maybe<User>;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  voucher?: Maybe<Voucher>;
  amount?: Maybe<Scalars['Int']>;
  buyer?: Maybe<User>;
};

export type TimeSlot = {
  __typename?: 'TimeSlot';
  id: Scalars['ID'];
  start: Scalars['String'];
  end: Scalars['String'];
  booking?: Maybe<Booking>;
};

export type Item = {
  __typename?: 'Item';
  appartment?: Maybe<Appartment>;
  voucher?: Maybe<Voucher>;
};

export type ReportItem = {
  __typename?: 'ReportItem';
  rooms?: Maybe<Scalars['Int']>;
  unbooked?: Maybe<Scalars['Int']>;
};

/** ------> auth JWT token */
export type UserAuth = {
  __typename?: 'UserAuth';
  token: Scalars['String'];
  name: Scalars['String'];
};
