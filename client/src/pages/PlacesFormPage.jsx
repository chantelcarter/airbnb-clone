import { useEffect, useState } from "react"
import Perks from "../Perks"
import PhotosUploader from "../PhotosUploader"
import AccountNav from "../AccountNav"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"

export default function PlacesFormPage() {
  const { id } = useParams()
  console.log({ id })
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {
    if (!id) {
      return
    }
    axios.get('/places/' + id)
  }, [id])

  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    )
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-500 text-sm">{text}</p>
    )
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }

  async function addNewPlace(ev) {
    ev.preventDefault()
    await axios.post('/places', {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests
    })
    setRedirect(true)
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={addNewPlace}>
        {preInput('Title', 'Title for your property. Should be short and catchy!')}
        <input
          type="text"
          value={title}
          onChange={ev => setTitle(ev.target.value)}
          placeholder="Title, for example: My lovely apartment"
        />
        {preInput('Address', 'Address to your property')}
        <input
          type="text"
          value={address}
          onChange={ev => setAddress(ev.target.value)}
          placeholder="Address"
        />
        {preInput('Photos', 'Photos of your property. More is better!')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description', 'Describe your property')}
        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
        {preInput('Perks', 'List the great features of your property')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput('Extra Information', 'House rules, etc.')}
        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
        {preInput('Check-in and Check-out times', 'Add check-in and check-out times. Remember to have a time window for cleaning the room between guests!')}
        <div className="grid gap-2 sm:grid-cols-3">
          <div className="mt-2 -mb-1">
            <h3> Check-in:</h3>
            <input
              type="text"
              value={checkIn}
              onChange={ev => setCheckIn(ev.target.value)}
              placeholder="2:00PM"
            />
          </div>
          <div className="mt-2 -mb-1">
            <h3> Check-out:</h3>
            <input
              type="text"
              value={checkOut}
              onChange={ev => setCheckOut(ev.target.value)}
              placeholder="11:00AM"
            />
          </div>
          <div className="mt-2 -mb-1">
            <h3> Max number of guests:</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={ev => setMaxGuests(ev.target.value)}
            />
          </div>
        </div>
        <div className="">
          <button className="primary my-4">Save</button>
        </div>

      </form>
    </div>
  )
}