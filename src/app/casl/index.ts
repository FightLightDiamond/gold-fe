import {defineAbility} from "@casl/ability";

const abilityRoles = (role:string, authId: number) => {
  return defineAbility((can, cannot) => {
    switch (role) {
      case "guest":
        break
      case "staff":
        can('view', 'Task', {assign: 2})
        can('active', 'Task')
        can('update', 'Password')
        break
      case "admin":
        can('view', 'Task')
        can('active', 'Task')
        can('delete', 'Task')
        can('update', 'Task')
        can('create', 'Task')
        cannot('update', 'Password')
        break
      case "user":
        //only show task of user login. Because {assign: authId}. ex:user2@gmail.com had id: 4
        can('view', 'Task', {assign: authId}) // authID eq 4
        can('active', 'Task')
        can('delete', 'Task')
        can('update', 'Task')
        can('create', 'Task')
        can('update', 'Password')
        break
    }
  })
}

export {abilityRoles}
