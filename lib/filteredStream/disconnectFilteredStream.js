const disconnectFilteredStream = () => {
  console.log(`Disconnecting filtered stream...`)
  filteredStream.disconnect()
  console.log(`Disconnected filtered stream.`)
}

export default disconnectFilteredStream
