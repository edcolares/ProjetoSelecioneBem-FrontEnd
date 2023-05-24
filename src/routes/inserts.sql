INSERT INTO public."user" ("name",email,"password","isActive","create_At","update_At","remove_At") VALUES
	 ('Michael Wilson','michael.wilson@example.com','$2b$10$OuP8XFQGFlqia6lJTaUXKu.ThjJO.Wfl5yrS4zQfFLjyHMAQcczpS',true,'2023-05-20 02:30:47.274681','2023-05-20 02:34:56.596445',NULL),
	 ('John Doe','john.doe@example.com','$2b$10$m81oD1M6O0mM052tSaXsuunEJL21STIhFohS79BpKSVV2IywkYv8C',true,'2023-05-20 02:34:13.130613','2023-05-20 02:35:17.179869',NULL),
	 ('Emily Davis','emily.davis@example.com','$2b$10$PU2Cb.xsBzD7HhQ3IThKp.71MO6Upzxvm5Vn5fZqrlER3zMXzGEsu',true,'2023-05-20 02:31:10.767371','2023-05-20 02:35:24.461083',NULL),
	 ('Paul Harden','paul.harden@example.com','$2b$10$i/JLrcg.IiLl.H3vwAFm3e.CPtBOuBbEJk0sV0Cei/eGCFr30jKiG',true,'2023-05-20 22:27:55.851664','2023-05-20 22:27:55.851664',NULL),
     ('Franguito Frangueiro','franguito@example.com','$2b$10$48MyHyPRk5HQeBwJ.dYOG.7r49JrhBZx4Kkcrac2vPXKB1ShoI0U6',true,'2023-05-20 22:27:00.27838','2023-05-20 22:27:00.27838',NULL);

INSERT INTO public.department ("name","isActive",manager,email) VALUES
	 ('Desenvolvimento',true,'João Silva','desenvolvimento@exemplo.com'),
	 ('Garantia de Qualidade',true,'Maria Santos','qualidade@exemplo.com'),
	 ('Infraestrutura',true,'Pedro Almeida','infraestrutura@exemplo.com'),
	 ('Ciência de Dados',true,'Ana Oliveira','dados@exemplo.com'),
	 ('Gestão de Produtos',true,'Luís Costa','produto@exemplo.com');


INSERT INTO public.candidate ("name",email) VALUES
	 ('Aurora Storm','aurora.storm@example.com'),
	 ('Zephyr Moon','zephyr.moon@example.com'),
	 ('Luna Stardust','luna.stardust@example.com'),
	 ('Xander Thunder','xander.thunder@example.com'),
	 ('Nova Blaze','nova.blaze@example.com'),
	 ('João Silva','joao.silva@example.com'),
	 ('Maria Santos','maria.santos@example.com'),
	 ('Pedro Almeida','pedro.almeida@example.com'),
	 ('Ana Oliveira','ana.oliveira@example.com'),
	 ('Lucas Ferreira','lucas.ferreira@example.com');

INSERT INTO public.skill ("name","type") VALUES
	 ('Trabalho em Equipe','Soft'),
	 ('Habilidade em contabilidade e finanças','Hard'),
	 ('Comunicação','Soft'),
	 ('Criatividade','Cognitive Skill'),
	 ('Empatia','Soft'),
	 ('Conhecimento técnico em hardware e software','Hard'),
	 ('Autoconfiança','Soft'),
	 ('Pensamento Crítico','Soft'),
	 ('Desenvolvimento de aplicativos móveis','Hard'),
	 ('Adaptabilidade','Soft'),
     ('Aprendizagem contínua','Cognitive Skill'),
	 ('Programação de computadores','Hard'),
	 ('Análise de dados','Hard'),
	 ('Resiliência','Soft'),
	 ('Conhecimento em línguas estrageiras','Hard'),
	 ('Gerenciamento de projetos','Hard'),
	 ('Design gráfico','Hard'),
	 ('Gerenciamento de tempo','Soft'),
	 ('Marketing digital','Hard'),
	 ('Resolução de problemas','Cognitive Skill'),
	 ('Conhecimentos em engenharia','Hard'),



INSERT INTO public.jobopportunity (title, level, "openingDate", "expectedDate", "closingDate", "create_At", "update_At", "FK_departmentId", "FK_userId")
VALUES 
   ('Desenvolvedor Full Stack', 'Senior', '2023-01-01', '2023-01-31', '2023-01-26', NOW(), NOW(), 1, 1),
   ('Analista de Dados', 'Pleno', '2023-01-05', '2023-01-25', '2023-01-27', NOW(), NOW(), 2, 2),
   ('UI/UX Designer', 'Júnior', '2023-01-10', '2023-01-20', '2023-01-20', NOW(), NOW(), 3, 1),
   ('Engenheiro de Software', 'Sênior', '2023-01-15', '2023-02-20', '2023-02-22', NOW(), NOW(), 1, 2),
   ('Analista de Marketing Digital', 'Pleno', '2023-01-20', '2023-01-25', '2023-01-31', NOW(), NOW(), 5, 3);


INSERT INTO public.jobopportunity_skill ("weightingFactor","create_At","FK_jobopportunityId","FK_skillId") VALUES
	 (9,'2023-05-20 23:12:04.900378',1,4),
	 (8,'2023-05-20 23:12:04.917283',1,15),
	 (10,'2023-05-20 23:12:04.929691',1,12),
	 (7,'2023-05-20 23:12:04.942858',1,1),
	 (10,'2023-05-20 23:14:11.405971',2,13),
	 (9,'2023-05-20 23:14:11.419943',2,3),
	 (8,'2023-05-20 23:14:11.43211',2,8),
	 (9,'2023-05-20 23:16:26.426222',3,17),
	 (8,'2023-05-20 23:16:26.440151',3,19),
	 (10,'2023-05-20 23:16:26.450953',3,4),
	 (7,'2023-05-20 23:16:26.461806',3,5),
	 (8,'2023-05-20 23:19:54.152704',4,2),
	 (6,'2023-05-20 23:19:54.166301',4,6),
	 (5,'2023-05-20 23:19:54.176429',4,21),
	 (9,'2023-05-20 23:19:54.187684',4,5),
	 (8,'2023-05-20 23:19:54.198977',4,18),
	 (9,'2023-05-20 23:19:54.209643',4,20),
	 (7,'2023-05-20 23:22:17.388055',5,11),
	 (9,'2023-05-20 23:22:17.401619',5,19),
	 (9,'2023-05-20 23:22:17.412592',5,17),
	 (10,'2023-05-20 23:22:17.423714',5,18),
	 (10,'2023-05-20 23:22:17.433633',5,1),
	 (8,'2023-05-20 23:22:17.445361',5,14);


