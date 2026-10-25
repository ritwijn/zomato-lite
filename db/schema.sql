CREATE TABLE restaurants (
  id        SERIAL PRIMARY KEY,
  slug      TEXT NOT NULL UNIQUE,
  name      TEXT NOT NULL,
  cuisine   TEXT NOT NULL,
  area      TEXT NOT NULL
);

CREATE TABLE reviews (
  id            SERIAL PRIMARY KEY,
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id),
  rating        INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment       TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- No average_rating or latest_review column, on either table, ever.
-- Those are computed at request time from `reviews` — see
-- app/lib/restaurants.ts. Storing them would let them drift out of
-- sync with the rows they're supposed to summarize.
