import { GoogleSpreadsheet } from "google-spreadsheet"
import GoogleAuth from "../../client_secret.js"

export async function getGoogleDoc() {
  const doc = new GoogleSpreadsheet(process.env.TW_GOOGLE_DOC_ID)
  await doc.useServiceAccountAuth(GoogleAuth)
  await doc.loadInfo()

  return doc
}
