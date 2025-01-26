export function getCountryById(client, countryId) {
    return client
      .from('countries')
      .select(
        `
        id,
        name
      `
      )
      .eq('id', countryId)
      .throwOnError()
      .single()
  }