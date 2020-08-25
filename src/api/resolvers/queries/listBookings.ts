import { Booking } from '../../models'
import { serializeBooking } from '../../serializers'

const listBookings = async (_, __, { user }) => {
  if (!user.id) return []

  if (user.type === 'admin') {
    const bookings = await Booking.find({})
    return bookings.map((booking) => serializeBooking(booking))
  }

  return user.bookings.map((booking) => serializeBooking(booking))
}

export default listBookings
