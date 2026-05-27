import clockIcon from '../assets/ui/clock.png'
import triangleIcon from '../assets/ui/triangle.png'

function RecipeCard({
  title,
  meta,
  imageUrl,
  actionLabel,
  onAction
}) {

  const parts = meta.split('|')

  const time =
    parts[0]?.trim() || ''

  const difficulty =
    parts[1]?.trim() || ''

  return (

    <article className="recipe-card">

      <div
        className="thumb food"
        style={{
          backgroundImage: imageUrl
            ? `url('${imageUrl}')`
            : undefined,

          backgroundSize: 'cover',

          backgroundPosition: 'center'
        }}
      />

      <div className="card-body">

        <h3 className="recipe-title">

          {title}

        </h3>

        <div className="recipe-info">

          <div className="recipe-info-item">

            <img
              src={clockIcon}
              alt="czas"
            />

            <span>

              {time}

            </span>

          </div>

          <div className="recipe-info-item">

            <img
              src={triangleIcon}
              alt="poziom"
            />

            <span>

              {difficulty}

            </span>

          </div>

        </div>

      </div>

      {

        actionLabel && (

          <button
            type="button"
            className="btn"

            onClick={onAction}
          >

            {actionLabel}

          </button>

        )

      }

    </article>

  )

}

export default RecipeCard