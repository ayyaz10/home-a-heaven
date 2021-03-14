
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('customer').del()
    .then(function () {
      // Inserts seed entries
      return knex('customer').insert([
        {user_id: 1, email: "ayyazahmed@gmail.com", password: "2a$10$tVwtf4bgvaBFzDLxOVwtGOqit67jHypKIf.62Tyzp.LKe5a/WwtHK", first_name: "ayyaz", last_name: "ahmed", created_on: new Date() },
        {user_id: 2, email: "ali@gmail.com", password: "2a$10$tVwtf4bgvaBFzDLxOVwtGOqit67jHypKIf.62Tyzp.LKe5a/WwtHK", first_name: "alia", last_name: "yousaf", created_on: new Date()},
        {user_id: 3, email: "satwat@gmail.com", password: "2a$10$tVwtf4bgvaBFzDLxOVwtGOqit67jHypKIf.62Tyzp.LKe5a/WwtHK", first_name: "satwat", last_name: "rana", created_on: new Date()}
      ]);
    });
};
