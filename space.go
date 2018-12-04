package typingwars

import (
	"github.com/Jaacky/typingwars/constants"
	"github.com/Jaacky/typingwars/pb"
	"github.com/Jaacky/typingwars/types"
	"github.com/gofrs/uuid"
)

type Space struct {
	Bases         map[uuid.UUID]*Base
	Units         map[uuid.UUID]*map[string]*Unit // { ClientID: { Word: Unit } ... }
	IncomingUnits map[uuid.UUID]*map[string]*Unit
	Targets       map[uuid.UUID]*Unit
}

func NewSpace(clients map[uuid.UUID]*Client) *Space {
	bases := make(map[uuid.UUID]*Base)
	units := make(map[uuid.UUID]*map[string]*Unit)
	incomingUnits := make(map[uuid.UUID]*map[string]*Unit)

	i := 0
	for _, client := range clients {
		var position *types.Point

		if i == 0 {
			position = types.NewPoint(constants.PlayerOneBaseXPosition, constants.PlayerOneBaseYPosition)
		} else {
			position = types.NewPoint(constants.PlayerTwoBaseXPosition, constants.PlayerTwoBaseYPosition)
		}

		base := NewBase(client.ID, position)
		bases[client.ID] = base

		playerUnits := make(map[string]*Unit)
		units[client.ID] = &playerUnits

		playerIncomingUnits := make(map[string]*Unit)
		incomingUnits[client.ID] = &playerIncomingUnits
		i++
	}

	return &Space{
		Bases:         bases,
		Units:         units,
		IncomingUnits: incomingUnits,
		Targets:       make(map[uuid.UUID]*Unit),
	}
}

func (space *Space) ToProto() *pb.Space {
	protoBases := make([]*pb.Base, 0, len(space.Bases))
	protoUnits := make([]*pb.Unit, 0, len(space.Units))
	protoTargets := make(map[string]*pb.Unit)

	for _, base := range space.Bases {
		protoBases = append(protoBases, base.ToProto())
	}

	for _, userUnits := range space.Units {
		for _, unit := range *userUnits {
			protoUnits = append(protoUnits, unit.ToProto())
		}
	}

	for id, target := range space.Targets {
		protoTargets[id.String()] = target.ToProto()
	}

	protoSpace := &pb.Space{
		Bases:   protoBases,
		Units:   protoUnits,
		Targets: protoTargets,
	}

	return protoSpace
}

func (space *Space) ToMessage() *pb.UserMessage {
	return &pb.UserMessage{
		Content: &pb.UserMessage_Space{
			Space: space.ToProto(),
		},
	}
}
