insert into c_security_role(id, name) values
('948b846c-d24f-4af0-ae33-7358bdad949d', 'ADMIN');

INSERT INTO c_security_permission(id, permission_label, permission_value) VALUES 
('21dd355c-e457-49b9-98b2-a8e84b9139f0', 'Administrator', 'ADMIN');

INSERT INTO c_security_role_permission(id_role, id_permission) VALUES 
('948b846c-d24f-4af0-ae33-7358bdad949d', '21dd355c-e457-49b9-98b2-a8e84b9139f0');

insert into c_security_menu_group(id, name, urut) VALUES
('SET', 'Setting', 1),
('MST', 'Master', 2),
('LAP', 'Laporan', 3);

INSERT INTO c_security_menu(id, menu_action, label, menu_level, menu_options, menu_order, id_group) VALUES
('d5278988-4c90-11e5-a30a-cff494b58cff','#/system/user.html','Setting User',1, '', 1,'SET'),
('d5278a82-4c90-11e5-a30c-b38fabaf51ea','#/system/menu.html','Setting Menu',1, '', 2,'SET'),
('d5278a0a-4c90-11e5-a30b-67554672ff60','#/system/role.html','Setting Role',1, '', 3,'SET'),
('d5278af0-4c90-11e5-a30d-4f6b6e78e7ae','#/system/permission.html','Setting Permission',1, '', 4,'SET'),
('d5278230-4c90-11e5-a2ff-076ec54f3917','#/master/anggaran.html','Master Anggaran',2, '', 1,'MST'),
('d527a0b2-4c90-11e5-a33b-1be950410b6c','#/reports/laporan-penjualan.html','Laporan Penjualan',6, '', 1,'LAP');


INSERT INTO c_security_role_menu(id_role, id_menu) VALUES 
('948b846c-d24f-4af0-ae33-7358bdad949d', 'd5278230-4c90-11e5-a2ff-076ec54f3917'),
('948b846c-d24f-4af0-ae33-7358bdad949d', 'd5278988-4c90-11e5-a30a-cff494b58cff'),
('948b846c-d24f-4af0-ae33-7358bdad949d', 'd5278a82-4c90-11e5-a30c-b38fabaf51ea'),
('948b846c-d24f-4af0-ae33-7358bdad949d', 'd5278a0a-4c90-11e5-a30b-67554672ff60'),
('948b846c-d24f-4af0-ae33-7358bdad949d', 'd5278af0-4c90-11e5-a30d-4f6b6e78e7ae'),
('948b846c-d24f-4af0-ae33-7358bdad949d', 'd527a0b2-4c90-11e5-a33b-1be950410b6c');

insert into c_security_user(id, username, fullname, password, active, id_role) values
('948b846c-d24f-4af0-ae33-7358bdad949d', 'admin', 'Administrator', '$2a$10$JX/cS0xTROODDGq0RdfqaOYk3mVbdK3Vijw4f0YpXkRlQWd0nzDVq', true, '948b846c-d24f-4af0-ae33-7358bdad949d');

