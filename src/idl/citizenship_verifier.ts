export type CitizenshipVerifier = {
  "address": "F9BEdj8sdPevfz2mYCxC3seg9MW9edLRUyGs8gsPjmRx",
  "metadata": {
    "name": "citizenshipVerifier",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "storeProof",
      "discriminator": [
        135,
        188,
        214,
        120,
        42,
        122,
        73,
        134
      ],
      "accounts": [
        {
          "name": "proofAccount",
          "writable": true,
          "signer": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "proofData",
          "type": {
            "defined": {
              "name": "proofData"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "proofAccount",
      "discriminator": [
        54,
        244,
        192,
        233,
        218,
        58,
        44,
        242
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "stringTooLong",
      "msg": "String exceeds maximum allowed length"
    }
  ],
  "types": [
    {
      "name": "proofAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userId",
            "type": "string"
          },
          {
            "name": "citizenshipNumber",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "dob",
            "type": "string"
          },
          {
            "name": "zkProof",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "proofData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userId",
            "type": "string"
          },
          {
            "name": "citizenshipNumber",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "dob",
            "type": "string"
          },
          {
            "name": "zkProof",
            "type": "bytes"
          }
        ]
      }
    }
  ]
};
