const convertDate = utcDateStr => {
  return new Date(utcDateStr).toLocaleString("en-US", {
    timeZone: "PST",
    hour12: false,
  })
}

export default convertDate
