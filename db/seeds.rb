coach = User.create!( username: 'james-clay',
                      password: 'supersecret',
                      password_confirmation: 'supersecret',
                      email: 'jamesclayfitness@gmail.com',
                      name: 'James Clay')

Client.create!(name: 'Ruth Berger', coach: coach, phone: '111-222-3333', email: 'ruthberger@test.com')
Client.create!(name: 'Matthew Berger', coach: coach, phone: '444-555-8799', email: 'mattberger99@gmail.com')

Service.create!(title: 'Full Training Session', duration: 60, coach: coach)
Service.create(title: 'Boxing Sessions', duration: 30, coach: coach)
Service.create(title: 'Consultation', duration: 75, coach: coach)
