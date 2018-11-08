package typingwars

import (
	"github.com/Jaacky/typingwars/pb"
	"github.com/Jaacky/typingwars/types"
	"github.com/gofrs/uuid"
)

type Space struct {
	Bases map[uuid.UUID]*Base
	Units map[uuid.UUID]*map[string]*Unit // { ClientID: { Word: Unit } ... }
}

func NewSpace(clients map[uuid.UUID]*Client) *Space {
	bases := make(map[uuid.UUID]*Base)
	units := make(map[uuid.UUID]*map[string]*Unit)

	i := 0
	for _, client := range clients {
		var position *types.Point

		if i == 0 {
			position = types.NewPoint(5, 50)
		} else {
			position = types.NewPoint(95, 50)
		}

		base := NewBase(client.ID, position)
		bases[client.ID] = base

		pUnits := make(map[string]*Unit)
		units[client.ID] = &pUnits
		i++
	}

	return &Space{
		Bases: bases,
		Units: units,
	}
}

func (space *Space) ToProto() *pb.Space {
	protoBases := make([]*pb.Base, 0, len(space.Bases))
	protoUnits := make([]*pb.Unit, 0, len(space.Units))

	for _, base := range space.Bases {
		protoBases = append(protoBases, base.ToProto())
	}

	for _, userUnits := range space.Units {
		for _, unit := range *userUnits {
			protoUnits = append(protoUnits, unit.ToProto())
		}
	}

	protoSpace := &pb.Space{
		Bases: protoBases,
		Units: protoUnits,
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
