export interface Adresse {
  numRue?: number
  nomRue?: string
  contactParDefaut?: boolean
  codePostal?: string
  libelleCodePostal?: string
  delegation?: string
}

export interface Telephone {
  numeroTelephone?: string
  typeTelephone?: string
  contactParDefaut?: boolean
}

export interface Mail {
  adresseMail?: string
  contactParDefaut?: boolean
}

export interface Personne {
  id: string
  nom: string
  prenom: string
  raisonSociale?: string
  dateDeNaissance: string
  activite: string
  listeAdresse?: Adresse[]
  listeTelephone?: Telephone[]
  listeMails?: Mail[]
  blackList?: boolean
}
