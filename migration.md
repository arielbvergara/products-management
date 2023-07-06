Creating new migration:
```
add-migration -Project products.database -StartupProject products.api -Context ProductsContext -Args '"Server=(localdb)\\MyInstance;Integrated Security=true;"' MIGRATIONNAME
```

Updating the database to the latest state:
```
Update-Database -StartupProject products.api -Project products.database -Context ProductsContext -Args '"Server=tcp:dbs-products-ariel.database.windows.net,1433;Initial Catalog=db-products-ariel;Persist Security Info=False;User ID=ariel;Password=yV@572#%&PHY;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"'
```