import React, { useState } from 'react'

function AddFilmForm(props) {
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    releaseYear: '',
    genre: '',
    rating: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    let formErrors = {};
    
    // Check for empty fields
    if (!formData.title) formErrors.title = 'title is required';
    if (!formData.director) formErrors.director = 'Director is required';
    if (!formData.releaseYear) formErrors.releaseYear = 'Release Year is required';
    if (!formData.genre) formErrors.genre = 'Genre is required';
    if (!formData.rating) formErrors.rating = 'Rating is required';

    // Validate rating between 0 and 10
    if (formData.rating && (formData.rating < 0 || formData.rating > 10)) {
      formErrors.rating = 'Rating must be between 0 and 10';
    }

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      // si no errors, submit form
      props.onFilmSubmit(formData);

      // Reset form
      setFormData({
        title: '',
        director: '',
        releaseYear: '',
        genre: '',
        rating: ''
      });
    } else {
      // validation errors
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className='grpForm'>
            <div>
                <label>title</label>
                <input
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && <span className="error">{errors.title}</span>}
            </div>
            <div>
                <label>Director</label>
                <input
                  name="director"
                  type="text"
                  value={formData.director}
                  onChange={handleChange}
                />
                {errors.director && <span className="error">{errors.director}</span>}
            </div>
        </div> 

        <div className='grpForm'>
            <div>
               <label>Release Year</label>
               <input
                 name="releaseYear"
                 type="number"
                 value={formData.releaseYear}
                 onChange={handleChange}
               />
               {errors.releaseYear && <span className="error">{errors.releaseYear}</span>}
            </div>
            <div>
                <label>Genre</label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                >
                 <option value="">Select Genre</option>
                 {props.list.map((elt, index) => (
                   <option key={index} value={elt}>{elt}</option>
                 ))}
               </select>
               {errors.genre && <span className="error">{errors.genre}</span>}
            </div>
        </div> 

        <div className='grpForm'>
            <div>
                <label>Rating</label>
                <input
                  name="rating"
                  type="number"
                  value={formData.rating}
                  onChange={handleChange}
                />
                {errors.rating && <span className="error">{errors.rating}</span>}
            </div>
            <div>
                <button type='submit'>Enregistrer</button>
                <button type='reset' onClick={() => setFormData({ title: '', director: '', releaseYear: '', genre: '', rating: '' })}>Reset</button>
            </div>
        </div> 
    </form>
  );
}

export default AddFilmForm;
