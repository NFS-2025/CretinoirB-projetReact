﻿namespace back_end_react.WebApi.Form;

public class UserForm
{
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public string Email { get; set; }
  public string Password { get; set; }
}

public class LoginModel
{
  public string Email { get; set; }
  public string Password { get; set; }
}