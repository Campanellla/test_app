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

export type Query = {
  __typename?: 'Query';
  getAppartment?: Maybe<Appartment>;
  getBooking?: Maybe<Booking>;
  getVoucher?: Maybe<Voucher>;
  getBookings?: Maybe<Array<Maybe<Booking>>>;
  getOrders?: Maybe<Array<Maybe<Order>>>;
  currentUser?: Maybe<User>;
  listAppartments?: Maybe<Array<Maybe<Appartment>>>;
  listVouchers?: Maybe<Array<Maybe<Voucher>>>;
};


export type QueryGetAppartmentArgs = {
  id: Scalars['ID'];
};


export type QueryGetBookingArgs = {
  id: Scalars['ID'];
};


export type QueryGetVoucherArgs = {
  id: Scalars['ID'];
};


export type QueryGetBookingsArgs = {
  userID?: Maybe<Scalars['ID']>;
};


export type QueryGetOrdersArgs = {
  userID?: Maybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  makeBooking?: Maybe<Booking>;
  makeOrder?: Maybe<Order>;
  addAppartment?: Maybe<Appartment>;
  addVoucher?: Maybe<Voucher>;
  addUser?: Maybe<User>;
  signIn?: Maybe<UserAuth>;
  signUp?: Maybe<User>;
};


export type MutationMakeBookingArgs = {
  userID: Scalars['ID'];
  appartmentID: Scalars['ID'];
};


export type MutationMakeOrderArgs = {
  userID: Scalars['ID'];
  voucherID: Scalars['ID'];
};


export type MutationAddAppartmentArgs = {
  input: AddAppartmentInput;
};


export type MutationAddVoucherArgs = {
  input: AddVoucherInput;
};


export type MutationAddUserArgs = {
  input: AddUserInput;
};


export type MutationSignInArgs = {
  input?: Maybe<UserSignInInput>;
};


export type MutationSignUpArgs = {
  input?: Maybe<UserSignUpInput>;
};

export type AddVoucherInput = {
  name: Scalars['String'];
  price: Scalars['Int'];
  variant: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
};

export type UserSignUpInput = {
  type: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AddAppartmentInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  rooms: Scalars['Int'];
};

export type AddUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

export type Appartment = {
  __typename?: 'Appartment';
  id: Scalars['ID'];
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
  name: Scalars['String'];
  price: Scalars['Int'];
  variant: Scalars['String'];
  quantity?: Maybe<Scalars['Int']>;
};

export type Booking = {
  __typename?: 'Booking';
  id: Scalars['ID'];
  appartment: Appartment;
  timeSlot: TimeSlot;
  buyer: User;
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  voucher: Voucher;
  buyer: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  type: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  bookings?: Maybe<Array<Maybe<Booking>>>;
  orders?: Maybe<Array<Maybe<Order>>>;
};

export type TimeSlot = {
  __typename?: 'TimeSlot';
  id: Scalars['ID'];
  start: Scalars['String'];
  end: Scalars['String'];
};

export type UserAuth = {
  __typename?: 'UserAuth';
  token: Scalars['String'];
  name: Scalars['String'];
};

export type UserSignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};
