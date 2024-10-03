SET
  sql_mode = '';

SELECT
  SUM(endPrice) AS sum,
  DATE_FORMAT (endDate, '%Y-%m-01 00:00:00') AS date
FROM
  Asset
WHERE
  endPrice IS NOT NULL
  AND endDate IS NOT NULL
GROUP BY
  YEAR (endDate),
  MONTH (endDate)
ORDER BY
  date DESC;