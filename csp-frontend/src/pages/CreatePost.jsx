import React, { useState } from 'react'
import axios from 'axios'

function CreatePost() {
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
    setError('')
  }

  const handleCaptionChange = (e) => {
    setCaption(e.target.value)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!image) {
      setError('Please select an image')
      return
    }

    if (!caption.trim()) {
      setError('Please enter a caption')
      return
    }

    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', image)
      formData.append('caption', caption)

      const res = await axios.post('http://localhost:3000/create-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setSuccess('Post created successfully!')
      setImage(null)
      setCaption('')
      
      // Reset file input
      document.querySelector('input[type="file"]').value = ''
      
      console.log('Post created:', res.data.post)
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create post')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='create-post-section'>
      <h1>Create post</h1>

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name='image'
          accept='image/*'
          onChange={handleImageChange}
          required
        />
        <input
          type="text"
          name='caption'
          placeholder='Enter caption'
          value={caption}
          onChange={handleCaptionChange}
          required
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </section>
  )
}

export default CreatePost