# Seed db with test data

coach = User.create!(username: 'james-clay',
                     password: 'supersecret',
                     password_confirmation: 'supersecret',
                     email: 'jamesclayfitness@gmail.com',
                     name: 'James Clay')

ClientCreationService.new(
  name: 'Ruth Berger',
  coach: coach,
  phone: '111-222-3333',
  email: 'ruthberger@test.com'
).create_client

ClientCreationService.new(
  name: 'Matthew Berger',
  coach: coach,
  phone: '444-555-8799',
  email: 'mattberger99@gmail.com'
).create_client

FitnessServiceCreationService.new(
  title: 'Full Training Session',
  duration: 60,
  coach: coach
).create_service

FitnessServiceCreationService.new(
  title: 'Boxing Sessions',
  duration: 30,
  coach: coach
).create_service

FitnessServiceCreationService.new(
  title: 'Consultation',
  duration: 75,
  coach: coach
).create_service

FitnessSessionCreationService.new(
  coach: coach,
  client: Client.first,
  service: FitnessService.first,
  location: 'Rise Athletic Club',
  day: Date.today,
  start_time: (Date.today.noon - 1.hour).to_time,
  end_time: Date.today.noon.to_time,
  notes: 'Super Awesome training session is scheduled, bring boxing gloves'
).create_session