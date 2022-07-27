#!/usr/bin/env node
import * as dotenv from "dotenv"
import app from "../lib/app.js"
dotenv.config()

app()
