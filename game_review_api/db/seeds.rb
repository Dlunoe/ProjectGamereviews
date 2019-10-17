# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
25.times do
    Review.create(
        title: Faker::TvShows::MichaelScott.quote,
        description: Faker::Books::Lovecraft.paragraph,
        opinion: Faker::TvShows::DrWho.quote
    )
end