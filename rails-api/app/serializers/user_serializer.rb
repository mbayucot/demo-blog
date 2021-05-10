class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :full_name, :is_subscribed

  attribute :stripe_customer_id,
            if: -> { @instance_options[:show_stripe_id].present? }

  def full_name
    "#{object.first_name} #{object.last_name}"
  end
end
