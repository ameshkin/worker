import {translate} from "./index"
import {Text} from "native-base"
import React from "react"

export default {



  // profile page
  greeting: 'Hello there',
  greeting_sub: 'You are logged in as',


  // profile DETAILS

  profile_detals_sub2: 'Worker Profile',
  //profile_details_content: 'You are logged in as',

  login: 'Login',
  logout: 'Logout',
  update_profile: 'Update My Profile',
  task_history: 'Task History',
  worker_dashboard: 'Worker Dashboard',
  user_dashboard: 'User Dashboard',
  set_location: 'Update Your Location',
  settings_profile: 'Settings',
  set_language: 'Your Languages',
  set_skills: 'Your Skills',
  set_cpu_languages: 'Computer Languages',
  set_certs: 'Certifications',
  set_degrees: 'College Degrees',
  set_clearance: 'Clearance Level',


  email: 'Email',
  password: 'Password',
  stay_informed: 'Stay Informed',
  change_language: 'Change Language',
  forgot_password: 'Forgot Password',
  register_worker: 'Register as a Worker',
  register_user: 'Register as a User',
  your_location: 'Your Location',
  newsletter_header: 'Sign Up for Our Newsletter',
  newsletter_button: 'Sign Up',

  profile_details_sub: 'Profile Details',
  profile_details_desc: 'Sign Up',

  profile_details_link: 'Profile Details',


  // worker profile
  worker_profile_sub: 'Worker Profile',


  // newsletter forms
  fname_error: 'Enter Your Full name',
  fname_label: 'Your Name',
  fname_place: 'Full Name',

  email_error: 'Enter a valid email',
  email_label: 'Your Email',
  email_place: 'Your Email Address',
  worker_email_place:  'Worker Email Address',

  city_error: 'Enter a valid city',
  city_label: 'Your City',
  city_place: 'Where do you live',

  // set location form
  state_error: 'Enter a valid state',
  state_label: 'Your State',
  state_place: 'Your State or Province',

  country_error: 'Enter a valid country',
  country_label: 'Your Country',
  country_place: 'The Country you live in',

  // worker fields

  headline_error: 'Enter a Profile Headline less than 100 characters',
  headline_label: 'Profile Headline',
  headline_place: '',

  category_error: 'You must choose a category',
  category_label: 'Choose a category',
  category_null: 'Choose a category',

  exp_error: 'Enter a valid amount in years',
  exp_label: 'Your Experience',
  exp_place: 'numbers only',


  more_place: 'Short Description about yourself',
  more_error: 'Enter a valid short description',

  public_label: 'Make profile public?',


  // set location page: error messages for geolocation catch fail
  geo_error: 'There was a problem looking up your location',
  geo_success: 'Your location details were saved ',

  // sign up form 1
  pass_error: 'Enter a Valid Password',
  pass_label: 'Password',
  pass_place: 'at least 6 digits',

  pass2_error: 'Passwords must match',
  pass2_label: 'Confirm Password',
  pass2_place: '',

  phone_error: 'Enter a number between 11 to 13 characters',
  phone_label: 'Phone Number',
  phone_place: 'numbers only with country code',




  // worker sign up form 2
  form_username: 'Username',
  // fname_place: 'Full Name',


  // language
  goback: 'Go Back',
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  it: 'Italian',
  ir: 'Persian',

  // skills
  programming: 'Programming',
  writer: 'Writer',
  publishing: 'Publishing',
  teaching: 'Teaching',


  // settings page
  general_settings: 'General Settings',
  privacy_settings: 'Privacy Settings',
  misc_settings: "Misc Settings",
  payment_settings: "Payment Settings",



  // profile details
  worker_details_profile_sub: 'Worker Details',
  worker_details_profile_cnt: 'Enter as many details as you like so you can find the exact job you want.',

  // subheaders
  cat_listing_sub: 'What do you need help with?',
  login_sub: 'Log In',
  about_sub: 'Frequently Asked Questions',
  profile_sub: 'Login to Edit Your Profile',
  signup_sub: 'Sign up as a User',
  welcome_sub: 'Welcome back',
  new_user_sub: 'Log In',
  geo_no_sub: 'Enter Your Location Manually',
  geo_yes_sub: 'Confirm Your Location',
  geo_no_cnt: 'Manually enter your location details',
  geo_yes_cnt: 'Change your location details if you like',
  forgot_sub: 'Reset Your Password',
  forgot_content: 'All of your login details are handled via Google.',
  language_sub: 'What do You Speak?',
  settings_sub: 'Update Your Settings',
  skills_sub: 'What Skills do You Have?',
  cpu_language_sub: 'Select Programming Languages',
  cpu_language_content: 'Enter the year you first learned the language.  The month and day is not necesssary.',
  workersignup_sub: 'Your Details',
  workersignup_content: 'Fill out this form to become a worker on this app.',
  save: 'save',
  cpu_programs_sub: 'Select Computer Programs',
  cpu_programs_place: 'Microsoft Word...',

  // headers
  ratings_header: 'Ratings',
  languages_spoken: 'Languages Spoken',
  worker_stats: 'Worker Skills',
  more_information: 'More Information',
  city_header: 'Works in ',
  profile_details_header1: 'Your Privacy',


  // settings
  contact_me: 'Is it ok for recruiters to contact you about jobs?',
  newsletter: 'Do you want to subscribe to our newsletter?',
  push: 'Do you want to receive push notifications?',
  looking_for_gigs: 'Are you looking for short term gigs?',
  looking_for_part: 'Are you looking for PART TIME work?',

  looking_for_full: 'Are you looking for FULL TIME work?',
  relocate: 'Are you willing to relocate?',
  remote: 'Are you willing to work remotely?',

  // category listing page
  cat_handyman_label: "Handyman",
  cat_handyman_description: "Hire a handyman for general work around the house",

  cat_plumber_label: "Plumber",
  cat_plumber_description: "Find a plumber!",

  cat_cleaners_label: "House Cleaners",
  cat_cleaners_description: "Hire a maid or service to clean your house",

  cat_movers_label: "Movers",
  cat_movers_description: "Find someone to help you move",

  cat_delivery_label: "Delivery",
  cat_delivery_description: "Find people willing to deliver just about anything",

  cat_shopper_label: "Personal Shopper",
  cat_shopper_description: "Hire someone to do your shopping",

  cat_designers_label: "Graphic Designer",
  cat_designers_description: "Hire a handyman for general work around the house",

  cat_programmers_label: "Programmer",
  cat_programmers_description: "Find someone to build whatever you like",

  cat_musicians_label: "Musicians",
  cat_musicians_description: "Find someone to jam with",




  // sign up form alert modal
  modal1_h1: 'Fill Out the Form Correctly',
  modal1_h2: 'Phone Numbers',
  modal1_h3: 'Phone numbers must be a number between 11 and 13 characters and start with a country code.',
  modal1_h4: 'Passwords',
  modal1_h5: 'Please make sure your password is at least six characters, and that both fields match.',
  modal1_button: 'BACK TO FORM',


  newuser: "Verify Your Email and then Login",


  // misc
  in: ' in ',
  cpu_language_place: 'Type a Computer Language..',


  // error messages
  default: 'Hmm, an unknown error occured',
  timeout: 'Server Timed Out. Check your internet connection',
  invalidJson: 'Response returned is not valid JSON',

  // Firebase Related
  invalidFirebase: 'Firebase is not connected correctly',

  // Member
  memberExists: 'Member already exists',
  missingFullName: 'Your name is missing',
  missingUsername: 'Your user name is missing',
  missingFirstName: 'First name is missing',
  missingLastName: 'Last name is missing',
  missingPhone: 'Please enter a phone number',
  missingEmail: 'Email is missing',
  missingPassword: 'Password is missing',
  passwordsDontMatch: 'Passwords do not match',

  // Recipes
  recipe404: 'Worker not found',
  missingMealId: 'Missing meal definition',

  // Locale
  localeDoesNotExist: 'Sorry, we do not support that local',
};
