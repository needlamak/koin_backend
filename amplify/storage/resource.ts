import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'snapchatCloneMedia',
  access: (allow) => ({
    // Public content like profile pictures or public stories
    'public/*': [
      allow.authenticated.to(['read']),
      allow.guest.to(['read']),
    ],
    // Users can upload, read, and delete their own private content.
    // The {identityId} is a variable dynamically replaced with the user's Cognito Identity ID.
    'private/{identityId}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
    ],
    // A shared space where a user can upload something, but only specific
    // other users (granted access programmatically) can read it.
    // This is useful for direct snaps. Access must be managed via code.
    'protected/{identityId}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
    ],
  }),
});