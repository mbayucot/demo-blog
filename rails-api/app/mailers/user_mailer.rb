class UserMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def thank_you_email
    @user = params[:user]
    mail(to: @user.email, subject: 'Thanks for subscribing!')
  end
end
