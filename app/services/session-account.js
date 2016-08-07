import Ember from 'ember'
import SimpleSession from 'ember-simple-auth/services/session'

const { inject: { service }, RSVP, Service, isEmpty } = Ember

export default SimpleSession.extend(
{ session: service('session')
, store: service()
, loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      const token = this.get('session.data.authenticated.token')

      if (!isEmpty(token)) {
        return this.get('store').find('user', 'me').then((account) => {
          this.set('account', account)

          resolve()
        }, reject)
      } else {
        resolve()
      }
    });
}
});