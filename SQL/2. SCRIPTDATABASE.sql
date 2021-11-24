USE [master]
GO
/****** Object:  Database [facturacion]    Script Date: 2/09/2020 7:46:57 p. m. ******/
CREATE DATABASE [facturacion]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'facturacion', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\facturacion.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'facturacion_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\facturacion_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [facturacion].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [facturacion] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [facturacion] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [facturacion] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [facturacion] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [facturacion] SET ARITHABORT OFF 
GO
ALTER DATABASE [facturacion] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [facturacion] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [facturacion] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [facturacion] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [facturacion] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [facturacion] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [facturacion] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [facturacion] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [facturacion] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [facturacion] SET  DISABLE_BROKER 
GO
ALTER DATABASE [facturacion] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [facturacion] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [facturacion] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [facturacion] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [facturacion] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [facturacion] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [facturacion] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [facturacion] SET RECOVERY FULL 
GO
ALTER DATABASE [facturacion] SET  MULTI_USER 
GO
ALTER DATABASE [facturacion] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [facturacion] SET DB_CHAINING OFF 
GO
ALTER DATABASE [facturacion] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [facturacion] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [facturacion] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'facturacion', N'ON'
GO
USE [facturacion]
GO
/****** Object:  Table [dbo].[clientes]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[clientes](
	[id_cliente] [int] IDENTITY(1,1) NOT NULL,
	[nombres] [nvarchar](50) NULL,
	[apellidos] [nvarchar](50) NULL,
	[estado] [bit] NULL,
	[fecha_nacimiento] [date] NULL,
 CONSTRAINT [PK_clientes] PRIMARY KEY CLUSTERED 
(
	[id_cliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[inventario]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[inventario](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_producto] [int] NULL,
	[inventario] [int] NULL,
 CONSTRAINT [PK_inventario] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[productos]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[productos](
	[id_producto] [int] IDENTITY(1,1) NOT NULL,
	[producto] [nvarchar](255) NULL,
	[estado] [bit] NULL,
	[precio] [decimal](18, 0) NULL,
	[inventario] [int] NULL,
 CONSTRAINT [PK_productos] PRIMARY KEY CLUSTERED 
(
	[id_producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ventas]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ventas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[id_producto] [int] NULL,
	[id_cliente] [int] NULL,
	[fecha_compra] [datetime] NULL,
	[valor] [decimal](18, 0) NULL,
 CONSTRAINT [PK_ventas] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[inventario]  WITH CHECK ADD  CONSTRAINT [FK_inventario_productos] FOREIGN KEY([id_producto])
REFERENCES [dbo].[productos] ([id_producto])
GO
ALTER TABLE [dbo].[inventario] CHECK CONSTRAINT [FK_inventario_productos]
GO
ALTER TABLE [dbo].[ventas]  WITH CHECK ADD  CONSTRAINT [FK_ventas_clientes] FOREIGN KEY([id_cliente])
REFERENCES [dbo].[clientes] ([id_cliente])
GO
ALTER TABLE [dbo].[ventas] CHECK CONSTRAINT [FK_ventas_clientes]
GO
ALTER TABLE [dbo].[ventas]  WITH CHECK ADD  CONSTRAINT [FK_ventas_producto] FOREIGN KEY([id_producto])
REFERENCES [dbo].[productos] ([id_producto])
GO
ALTER TABLE [dbo].[ventas] CHECK CONSTRAINT [FK_ventas_producto]
GO
/****** Object:  StoredProcedure [dbo].[delete_venta]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Jonatan Alexander Rojas>
-- Create date: <Create Date,2020/09/01>
-- Description:	<Description,Lista los clientes mayores a >
-- =============================================
CREATE PROCEDURE [dbo].[delete_venta]	
		@id INT
	AS
BEGIN	

	BEGIN TRY  
		DELETE FROM [dbo].[ventas] WHERE id = @id		

		SELECT 1 transaccion, 'Registro eliminado exitosa' Mensaje, 1 estado
	END TRY  
	BEGIN CATCH  
		 SELECT -1 transaccion, 'Error eliminando' Mensaje, 1 estado
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[get_clientes]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Jonatan Alexander Rojas>
-- Create date: <Create Date,2020/09/01>
-- Description:	<Description,Lista los clientes mayores a >
-- =============================================
CREATE PROCEDURE [dbo].[get_clientes]	
	@estado BIT = 1,
	@minEdad INT = 35
	AS
BEGIN
	DECLARE
		@fechaActual DATETIME = getdate(),
		@fechaUno DATETIME = '20000201',
		@fechaDos DATETIME = '20000525'		

	SELECT 
		c.id_cliente,
		c.nombres,
		c.apellidos,
		TRIM(c.apellidos) + ' ' + TRIM(c.nombres) AS cliente,
		c.estado,
		c.fecha_nacimiento,
		DATEDIFF(year, c.[fecha_nacimiento], @fechaActual) AS años
		
	FROM [dbo].[clientes] c
	INNER JOIN [dbo].[ventas] v
		ON c.id_cliente = v.id_cliente
	WHERE (DATEDIFF(year, c.[fecha_nacimiento], @fechaActual)) <= @minEdad
	--and v.fecha_compra BETWEEN @fechaUno AND @fechaDos
	GROUP BY C.id_cliente, c.nombres, c.apellidos, c.estado, c.fecha_nacimiento
END
GO
/****** Object:  StoredProcedure [dbo].[get_productos]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Jonatan Alexander Rojas>
-- Create date: <Create Date,2020/09/01>
-- Description:	<Description,Lista los productos que tengan un estado activo>
-- =============================================
CREATE PROCEDURE [dbo].[get_productos]	
	@estado BIT = 1
	AS
BEGIN

	SELECT 
		P.id_producto,
		producto,
		estado,
		precio,
		I.inventario
	FROM [dbo].[productos] P
	INNER JOIN [dbo].[inventario] I
		ON P.id_producto = I.id_producto
	WHERE estado = @estado	
END
GO
/****** Object:  StoredProcedure [dbo].[get_productosbyAno]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Jonatan Alexander Rojas>
-- Create date: <Create Date,2020/09/01>
-- Description:	<Description,Lista el total de ventas por producto con un año de filtro
-- =============================================
CREATE PROCEDURE [dbo].[get_productosbyAno]	
	@estado BIT = 1,
	@ano INT = 2000
	AS
BEGIN
	
	SELECT 
		P.id_producto,
		P.producto,
		SUM(v.valor) total,
		P.estado
	FROM [dbo].[productos] P
	INNER JOIN [dbo].[ventas] V
		ON P.id_producto = V.id_producto
	WHERE YEAR(V.fecha_compra) = @ano
	GROUP BY P.id_producto, P.producto, P.estado

END
GO
/****** Object:  StoredProcedure [dbo].[get_stock_productos]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Jonatan Alexander Rojas>
-- Create date: <Create Date,2020/09/01>
-- Description:	<Description,Lista los productos cuyo stock sea menor al enviado desde el front>
-- =============================================
CREATE PROCEDURE [dbo].[get_stock_productos]	
	@estado BIT = 1,
	@minStock INT
	AS
BEGIN

	SELECT 
		id_producto,
		producto,
		estado,
		precio,
		inventario
	FROM [dbo].[productos] 
	WHERE inventario <= @minStock
	AND estado = @estado	
END
GO
/****** Object:  StoredProcedure [dbo].[get_ventas]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Jonatan Alexander Rojas>
-- Create date: <Create Date,2020/09/01>
-- Description:	<Description,Lista los clientes mayores a >
-- =============================================
CREATE PROCEDURE [dbo].[get_ventas]	
	
	AS
BEGIN

	SELECT 
		V.id,
		V.id_cliente,
		TRIM(C.apellidos) + ' ' + TRIM(C.nombres) as cliente,
		V.id_producto,
		P.producto,
		V.fecha_compra,
		V.valor	
	FROM [dbo].[ventas] V
	INNER JOIN [dbo].[clientes] C
		ON V.id_cliente = C.id_cliente
	INNER JOIN [dbo].[productos] P
		ON V.id_producto = P.id_producto	
END
GO
/****** Object:  StoredProcedure [dbo].[Script1]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Jonatan Alexander Rojas>
-- Create date: <Create Date,2020/09/01>
-- Description:	<Description, Obtener la lista de precios de todos los productos>
-- =============================================
CREATE PROCEDURE [dbo].[Script1]	
	@estado BIT = 1
	AS
BEGIN

	SELECT 
		P.id_producto,
		producto,
		estado,
		precio,
		I.inventario
	FROM [dbo].[productos] P
	INNER JOIN [dbo].[inventario] I
		ON P.id_producto = I.id_producto
	WHERE estado = @estado	
END
GO
/****** Object:  StoredProcedure [dbo].[Script2]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Jonatan Alexander Rojas>
-- Create date: <Create Date,2020/09/01>
-- Description:	<Description, Obtener la lista de productos cuya existencia en el inventario haya llegado al mínimo permitido (5 unidades)>
-- =============================================
CREATE PROCEDURE [dbo].[Script2]	
	@estado BIT = 1,
	@minStock INT = 5
	AS
BEGIN

	SELECT 
		id_producto,
		producto,
		estado,
		precio,
		inventario
	FROM [dbo].[productos] 
	WHERE inventario <= @minStock
	AND estado = @estado	
END
GO
/****** Object:  StoredProcedure [dbo].[Script3]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Jonatan Alexander Rojas>
-- Create date: <Create Date,2020/09/01>
-- Description:	<Description,Obtener una lista de clientes no mayores de 35 años que hayan realizado compras entre el 1 de febrero de 2000 y el 25 de mayo de 2000>
-- =============================================
CREATE PROCEDURE [dbo].[Script3]	
	@estado BIT = 1,
	@minEdad INT = 35
	AS
BEGIN
	DECLARE
		@fechaActual DATETIME = getdate(),
		@fechaUno DATETIME = '20000201',
		@fechaDos DATETIME = '20000525'		

	SELECT 
		c.id_cliente,
		c.nombres,
		c.apellidos,
		TRIM(c.apellidos) + ' ' + TRIM(c.nombres) AS cliente,
		c.estado,
		c.fecha_nacimiento,
		DATEDIFF(year, c.[fecha_nacimiento], @fechaActual) AS años
		
	FROM [dbo].[clientes] c
	INNER JOIN [dbo].[ventas] v
		ON c.id_cliente = v.id_cliente
	WHERE (DATEDIFF(year, c.[fecha_nacimiento], @fechaActual)) <= @minEdad
	AND v.fecha_compra BETWEEN @fechaUno AND @fechaDos
	GROUP BY C.id_cliente, c.nombres, c.apellidos, c.estado, c.fecha_nacimiento
END
GO
/****** Object:  StoredProcedure [dbo].[Script4]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Jonatan Alexander Rojas>
-- Create date: <Create Date,2020/09/01>
-- Description:	<Description,Obtener el valor total vendido por cada producto en el año 2000>
-- =============================================
CREATE PROCEDURE [dbo].[Script4]	
	@estado BIT = 1,
	@ano INT = 2000
	AS
BEGIN
	
	SELECT 
		P.id_producto,
		P.producto,
		SUM(v.valor) total,
		P.estado
	FROM [dbo].[productos] P
	INNER JOIN [dbo].[ventas] V
		ON P.id_producto = V.id_producto
	WHERE YEAR(V.fecha_compra) = @ano
	GROUP BY P.id_producto, P.producto, P.estado

END
GO
/****** Object:  StoredProcedure [dbo].[set_ventas]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Jonatan Alexander Rojas>
-- Create date: <Create Date,2020/09/01>
-- Description:	<Description,Crea la venta y actualiza stock>
-- =============================================
CREATE PROCEDURE [dbo].[set_ventas]		
		@id_cliente INT,
		@id_producto INT,
		@valor DECIMAL(18,2)		
	AS
BEGIN	
	DECLARE
		@fecha_compra DATETIME = GETDATE(),
		@stock INT

	-- SACO LA CANTIDAD DE INVENTARIO DEL PRODUCTO A CREAR
	SELECT @stock = i.inventario 
	FROM [dbo].[productos] P
	INNER JOIN [dbo].[inventario] I
		ON P.id_producto = I.id_producto
	WHERE p.id_producto = @id_producto

	BEGIN TRY  
		-- Valida si hay stock en el producto
	IF (@stock = 0)
	BEGIN
		SELECT -1 transaccion, 'No cuenta con inventario del producto' Mensaje, 1 estado
	END
	ELSE 
	BEGIN
		-- INSERTA EL PRODUCTO EN VENTAS
		INSERT INTO [dbo].[ventas] (
		[id_producto],
		[id_cliente],
		[valor],
		[fecha_compra]
		) VALUES (
			@id_producto,
			@id_cliente,
			@valor,
			@fecha_compra
		)

		-- ACTUALIZA EL STOCK DEL PRODUCTO
		UPDATE [dbo].[inventario] SET inventario = inventario - 1
		WHERE id_producto = @id_producto

		SELECT 1 transaccion, 'Venta creada exitosamente' Mensaje, 1 estado
	END
	END TRY  
	BEGIN CATCH  
		 SELECT -1 transaccion, 'Error al crear' Mensaje, 1 estado
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[update_venta]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Jonatan Alexander Rojas>
-- Create date: <Create Date,2020/09/01>
-- Description:	<Description,Lista los clientes mayores a >
-- =============================================
CREATE PROCEDURE [dbo].[update_venta]	
		@id INT,
		@id_cliente INT,
		@id_producto INT,
		@valor DECIMAL(18,2),
		@fecha_compra DATETIME
	AS
BEGIN
	SELECT @fecha_compra = GETDATE()

	BEGIN TRY  
		UPDATE [dbo].[ventas] SET 
			id_cliente = @id_cliente,
			id_producto = @id_producto,
			valor = @valor,
			fecha_compra = @fecha_compra
		WHERE id = @id

		SELECT 1 transaccion, 'Actualizacion exitosa' Mensaje, 1 estado
	END TRY  
	BEGIN CATCH  
		 SELECT -1 transaccion, 'Error actualizando' Mensaje, 1 estado
	END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[update_ventas]    Script Date: 2/09/2020 7:46:58 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Jonatan Alexander Rojas>
-- Create date: <Create Date,2020/09/01>
-- Description:	<Description,Lista los clientes mayores a >
-- =============================================
CREATE PROCEDURE [dbo].[update_ventas]	
		@id INT,
		@id_cliente INT,
		@id_producto INT,
		@valor DECIMAL(18,2),
		@fecha_compra DATETIME
	AS
BEGIN
	SELECT @fecha_compra = GETDATE()

	BEGIN TRY  
		UPDATE [dbo].[ventas] SET 
			id_cliente = @id_cliente,
			id_producto = @id_producto,
			valor = @valor,
			fecha_compra = @fecha_compra
		WHERE id = @id

		SELECT 1 transaccion, 'Actualizacion exitosa' Mensaje, 1 estado
	END TRY  
	BEGIN CATCH  
		 SELECT -1 transaccion, 'Error actualizando' Mensaje, 1 estado
	END CATCH
END
GO
USE [master]
GO
ALTER DATABASE [facturacion] SET  READ_WRITE 
GO
