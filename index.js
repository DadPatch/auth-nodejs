"use strict";
const Request = require('./src/request')
const Users = require('./src/users')
const Groups = require('./src/groups');
const Apps = require('./src/apps');
const Permissions = require('./src/permissions');

module.exports = function(apiKey, options = {}) {
  if (!apiKey) throw new Error('No API key provided')
  
  const request = new Request(apiKey, options.host)

  return {
    login: (email, password, refresh = false) => request.post('/auth/login', {email, password, refresh}),
    remindPassword: (email) => request.post('/auth/remind', {email}),
    refreshToken: (token) => request.post('/auth/refresh', {token}),
    refreshToken: (token) => request.post('/auth/refresh', {token}),
    changePasswordVerify: ({h, s}) => request.post(`/auth/change/verify`, {h, s}),
    changePasswordAccept: ({h, s, password}) => request.post(`/auth/change/accept`, {h, s, password}),
    evartai: {
      login: (ticket, refresh = false) => request.post('/auth/evartai/login', {ticket, refresh}),
      sign: (host) => request.post('/auth/evartai/sign', {host})
    },
    setToken: (token) => {
      request.setToken(token)

      const users = new Users(request)
      const groups = new Groups(request)
      const apps = new Apps(request)
      const permissions = new Permissions(request)

      return {
        users,
        groups,
        apps,
        permissions
      }
    },
  }
}