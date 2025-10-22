# Define the docker-compose command to use
COMPOSE_EXEC = docker-compose exec hardhat

.PHONY: help build compile test deploy verify-nft shell clean

help:
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  build       Build or rebuild the Docker service"
	@echo "  compile     Compile the smart contracts"
	@echo "  test        Run the test suite"
	@echo "  deploy      Deploy NFT contract to the configured network (bscTestnet)"
	@echo "  verify  		 Verify the deployed NFT contract on BscScan"
	@echo "  shell       Start an interactive shell inside the hardhat container"
	@echo "  clean       Stop and remove the Docker container"

# Build the docker image and container
build:
	docker-compose up --build -d

# Compile contracts inside the container
compile:
	$(COMPOSE_EXEC) npm run compile

# Run tests inside the container
test:
	$(COMPOSE_EXEC) npm run test

# Deploy contracts using the script inside the container
deploy:
	$(COMPOSE_EXEC) npm run deploy

# Verify the deployed NFT contract on BscScan
verify:
	$(COMPOSE_EXEC) npm run verify

# Access the container's shell
shell:
	$(COMPOSE_EXEC) sh

# Stop and remove the container
clean:
	docker-compose down
