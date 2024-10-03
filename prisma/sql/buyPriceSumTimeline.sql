SET
  sql_mode = '';

SELECT
  SUM(startPrice) AS sum,
  DATE_FORMAT (startDate, '%Y-%m-01 00:00:00') AS date
FROM
  Asset
WHERE
  startPrice IS NOT NULL
  AND startDate IS NOT NULL
GROUP BY
  YEAR (startDate),
  MONTH (startDate)
ORDER BY
  date DESC;