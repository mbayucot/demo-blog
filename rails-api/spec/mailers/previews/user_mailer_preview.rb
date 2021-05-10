# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def thank_you_email
    UserMailer.with(user: User.first).thank_you_email
  end
end
