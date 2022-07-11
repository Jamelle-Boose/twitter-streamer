const convertDate = utcDateStr => {
  return new Date(utcDateStr).toLocaleString("en-US", { timeZone: "PST" })
}

export default convertDate
