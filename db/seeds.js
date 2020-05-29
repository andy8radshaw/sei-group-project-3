const mongoose = require('mongoose')
const Hike = require('../models/hike')
const User = require('../models/user')
const Group = require('../models/group')
const { dbURI } = require('../config/environment')
const hikeData = require('./data/hikes')
const groupData = require('./data/groups')

// const faker = require('faker')

mongoose.connect(
  dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  async (err, db) => {


    if (err) return console.log(err)

    try {
      await db.dropDatabase()

      const users = [
        {
          username: 'purvi',
          email: 'purvi@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          fullName: 'Purvi Trivedi',
          profileImage: 'https://ca.slack-edge.com/T0351JZQ0-USUJBDV5K-2f32610034a1-512',
          bio: 'i love mountains. and they love me. Honestly I would marry them, am already married to guy who actually looks a lot like a mountain. I lovingly call him Slieve'

        },
        {
          username: 'andy',
          email: 'andy@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          fullName: 'Andy Bradshaw',
          profileImage: 'https://ca.slack-edge.com/T0351JZQ0-UU102331A-b57d0b0c7344-512',
          bio: 'I am a keen outdoorsman with a zest for mountain life. I use the strongest expedition strength moustache wax. I have currently only summited peaks in the UK including Snowdonia and Pen Y Fan. I\'ll always pack my boots and my leatherman and I\'m ready to ROCK (if you\'ll pardon the pun).'
        },
        {
          username: 'kuriko',
          email: 'kuriko@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          fullName: 'Kuriko Iwai',
          profileImage: 'https://ca.slack-edge.com/T0351JZQ0-UTPHSCSFM-2d30f354c545-512'

        },

        {
          username: 'jack',
          email: 'jack@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          fullName: 'Jack May',
          profileImage: 'https://ca.slack-edge.com/T0351JZQ0-UF7T00ANN-9e0ffcda6506-512'

        },
        {
          username: 'charlotte',
          email: 'charlotte@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          fullName: 'Charlotte Morgan',
          profileImage: 'https://ca.slack-edge.com/T0351JZQ0-UDC194EAH-3d2a5f44ffa8-512'

        },
        {
          username: 'abi',
          email: 'abi@email',
          password: 'pass',
          passwordConfirmation: 'pass',
          fullName: 'Abigail Foreman',
          profileImage: 'https://ca.slack-edge.com/T0351JZQ0-UPF4VBW6A-aa58c07cbaf1-512'

        }
      ]

      // for (let i = 0; i < 100; i++) {
      //   const name = faker.name.findName()
      //   const image = faker.image.avatar()
      //   users.push({
      //     username: name.split(' ')[0].toLowerCase(),
      //     email: `${name.split(' ').join('').toLowerCase()}@email.com`,
      //     password: 'pass',
      //     passwordConfirmation: 'pass',
      //     fullName: name,
      //     profileImage: image

      //   })
      // }


      const createdUsers = await User.create(users)

      console.log(`${createdUsers.length} Users created`)

      const hikesWithUsers = hikeData.map(hike => {
        return { ...hike, user: createdUsers[1]._id }
      })

      // const numberOfMembers = []
      // numberOfMembers.length = Math.ceil(Math.random() * 20)
      // for (let i = 0; i < numberOfMembers.length; i++) {
      //   numberOfMembers[i] = createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
      // }



      const groupsWithUsers = groupData.map(group => {
        return { ...group, createdMember: createdUsers[Math.floor(Math.random() * createdUsers.length)]._id }
      })

      const hikes = await Hike.create(hikesWithUsers)
      console.log(`${'⛰️'.repeat(hikes.length)} Hikes created`)

      const groups = await Group.create(groupsWithUsers)
      console.log(`${'🙌'.repeat(groups.length)} Groups created`)

    } catch (err) {
      console.log(err)
    }
    await mongoose.connection.close()
    console.log('Cheers Then!')
  })




