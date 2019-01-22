coach = User.create!( username: 'james-clay',
                      password: 'supersecret',
                      password_confirmation: 'supersecret',
                      email: 'jamesclayfitness@gmail.com',
                      name: 'James Clay')

Client.create!(name: 'Ruth Berger', coach: coach, phone: '111-222-3333', email: 'ruthberger@test.com')
Client.create!(name: 'Matthew Berger', coach: coach, phone: '444-555-8799', email: 'mattberger99@gmail.com')
