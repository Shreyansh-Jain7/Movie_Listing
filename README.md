# Movie_Listing

Backend deployed link-
https://movie-list-backend-8nzr.onrender.com/

User routes-
| post | /user/signup | {email,password,confirmpassword} |
| post | /user/login | {email,password} | returns jwt token |

Movie routes-
| get | /mov/ | returns all movies |
| post | /mov/ | {title,genre,rating} | add a new movie to the database|
| patch | /mov/:id | {rate} | review a movie by giving it a rating |
| delete | /mov/:id | only delete the movies you have added
