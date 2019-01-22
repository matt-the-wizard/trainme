class Util
  PHONE_FORMAT = /\A(\d{10}|\(?\d{3}\)?[-. ]\d{3}[-.]\d{4})\z/.freeze
  EMAIL_FORMAT = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/.freeze
end